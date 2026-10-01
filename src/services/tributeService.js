import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_TRIBUTES } from '../data/initialData';
import { sendTributeNotification } from './notificationService';

const LOCAL_STORAGE_KEY = 'dami_birthday_tributes';
const DELETED_IDS_KEY = 'dami_deleted_tributes';

export function getDeletedTributeIds() {
  try {
    const saved = localStorage.getItem(DELETED_IDS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function markTributeDeletedLocally(id) {
  try {
    const list = getDeletedTributeIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(DELETED_IDS_KEY, JSON.stringify(list));
    }
  } catch (err) {
    console.error('Failed to save deleted ID:', err);
  }
}

export function getLocalTributes() {
  const deletedIds = getDeletedTributeIds();
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list = saved ? JSON.parse(saved) : INITIAL_TRIBUTES;
    return list.filter(t => !deletedIds.includes(t.id));
  } catch {
    return INITIAL_TRIBUTES.filter(t => !deletedIds.includes(t.id));
  }
}

export function saveLocalTributes(tributes) {
  try {
    const deletedIds = getDeletedTributeIds();
    const cleanList = tributes.filter(t => !deletedIds.includes(t.id));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleanList));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// Fetch tributes from Supabase
export async function fetchTributes() {
  const deletedIds = getDeletedTributeIds();

  if (!isSupabaseConfigured || !supabase) {
    return getLocalTributes();
  }

  try {
    const { data, error } = await supabase
      .from('tributes')
      .select('*')
      .neq('name', 'DELETED')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error);
      return getLocalTributes();
    }

    if (data && Array.isArray(data)) {
      const seenKeys = new Set();
      const dbTributes = [];

      for (const item of data) {
        if (!item.name || item.name === 'DELETED' || deletedIds.includes(item.id)) continue;
        const dedupeKey = `${(item.name || '').trim().toLowerCase()}::${(item.birthday_wish || '').trim().toLowerCase()}`;
        if (seenKeys.has(dedupeKey)) continue;
        seenKeys.add(dedupeKey);

        const rawDescribe = item.describe_to_stranger || '';
        const isPending = rawDescribe.includes('__STATUS:PENDING__');
        const cleanDescribe = rawDescribe.replace('__STATUS:PENDING__', '').replace('__STATUS:APPROVED__', '').trim();

        dbTributes.push({
          id: item.id,
          name: item.name,
          relationship: item.relationship || 'Friend',
          relationshipCategory: item.relationship_category || 'friends',
          threeWords: item.three_words || '',
          appreciation: item.appreciation || '',
          standoutQuality: item.standout_quality || '',
          describeToStranger: cleanDescribe,
          birthdayWish: item.birthday_wish || '',
          prayer: item.prayer || '',
          futureMessage: item.future_message || '',
          likes: item.likes || 0,
          isWife: item.is_wife || false,
          isDaughter: item.name?.toLowerCase().includes('odun') || false,
          isApproved: !isPending,
          status: isPending ? 'pending' : 'approved',
          photoUrl: item.photo_url || null,
          date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        });
      }

      saveLocalTributes(dbTributes);
      return dbTributes;
    }

    return [];
  } catch (err) {
    console.warn('Supabase fetch error, falling back to local data:', err);
    return getLocalTributes();
  }
}

// Save a new tribute to Supabase + LocalStorage (defaults to pending for review)
export async function createTribute(tribute) {
  // Fire email notification in background
  sendTributeNotification(tribute).catch((err) => {
    console.warn('Notification trigger caught error:', err);
  });

  if (isSupabaseConfigured && supabase) {
    try {
      const describeWithStatus = (tribute.describeToStranger ? tribute.describeToStranger + ' ' : '') + '__STATUS:PENDING__';

      const payload = {
        name: tribute.name,
        relationship: tribute.relationship,
        relationship_category: tribute.relationshipCategory || 'friends',
        three_words: tribute.threeWords || '',
        appreciation: tribute.appreciation || '',
        standout_quality: tribute.standoutQuality || '',
        describe_to_stranger: describeWithStatus,
        birthday_wish: tribute.birthdayWish || '',
        prayer: tribute.prayer || '',
        future_message: tribute.futureMessage || '',
        likes: tribute.likes || 0,
        is_wife: tribute.isWife || false,
        photo_url: tribute.photoUrl || null
      };

      const { data, error } = await supabase
        .from('tributes')
        .insert([payload])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        return {
          ...tribute,
          id: data.id,
          isApproved: false,
          status: 'pending',
          date: new Date(data.created_at).toISOString().split('T')[0]
        };
      }
    } catch (err) {
      console.warn('Supabase insert failed, saving locally:', err);
    }
  }

  return {
    ...tribute,
    isApproved: false,
    status: 'pending'
  };
}

// Approve a tribute in Supabase
export async function approveTributeInDb(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase
        .from('tributes')
        .select('describe_to_stranger')
        .eq('id', id)
        .single();

      const current = data?.describe_to_stranger || '';
      const updated = current.replace('__STATUS:PENDING__', '__STATUS:APPROVED__').trim();

      await supabase
        .from('tributes')
        .update({ describe_to_stranger: updated })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase approve update failed:', err);
    }
  }
}

// Hide / Unapprove a tribute in Supabase
export async function hideTributeInDb(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data } = await supabase
        .from('tributes')
        .select('describe_to_stranger')
        .eq('id', id)
        .single();

      const current = data?.describe_to_stranger || '';
      const updated = current.replace('__STATUS:APPROVED__', '').trim() + ' __STATUS:PENDING__';

      await supabase
        .from('tributes')
        .update({ describe_to_stranger: updated })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase hide update failed:', err);
    }
  }
}

// Delete a tribute from Supabase and mark permanently deleted
export async function deleteTributeFromDb(id) {
  markTributeDeletedLocally(id);

  if (isSupabaseConfigured && supabase) {
    try {
      // Update name to DELETED
      await supabase
        .from('tributes')
        .update({ name: 'DELETED' })
        .eq('id', id);

      // Attempt hard delete
      await supabase
        .from('tributes')
        .delete()
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase delete failed:', err);
    }
  }
}

// Like a tribute in Supabase
export async function likeTributeInDb(id, currentLikes = 0) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('tributes')
        .update({ likes: currentLikes + 1 })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase like update failed:', err);
    }
  }
}

// Subscribe to real-time events (INSERT, UPDATE, DELETE)
export function subscribeToRealtimeTributes(handlers) {
  if (!isSupabaseConfigured || !supabase) return () => {};

  const onInsert = typeof handlers === 'function' ? handlers : handlers?.onInsert;
  const onUpdate = handlers?.onUpdate;
  const onDelete = handlers?.onDelete;

  const mapItem = (item) => ({
    id: item.id,
    name: item.name,
    relationship: item.relationship,
    relationshipCategory: item.relationship_category || 'friends',
    threeWords: item.three_words || '',
    appreciation: item.appreciation || '',
    standoutQuality: item.standout_quality || '',
    describeToStranger: item.describe_to_stranger || '',
    birthdayWish: item.birthday_wish || '',
    prayer: item.prayer || '',
    futureMessage: item.future_message || '',
    likes: item.likes || 0,
    isWife: item.is_wife || false,
    isDaughter: item.is_daughter || false,
    isApproved: item.is_approved !== undefined ? item.is_approved : true,
    photoUrl: item.photo_url || null,
    date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });

  const channel = supabase
    .channel('public:tributes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'tributes' },
      (payload) => {
        if (payload.new && onInsert) {
          onInsert(mapItem(payload.new));
        }
      }
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'tributes' },
      (payload) => {
        if (payload.new && onUpdate) {
          onUpdate(mapItem(payload.new));
        }
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'tributes' },
      (payload) => {
        const oldId = payload.old?.id;
        if (oldId && onDelete) {
          onDelete(oldId);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
