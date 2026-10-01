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

// Fetch tributes from Supabase and merge with starter tributes
export async function fetchTributes() {
  const deletedIds = getDeletedTributeIds();
  const baseTributes = INITIAL_TRIBUTES.filter(t => !deletedIds.includes(t.id));

  if (!isSupabaseConfigured || !supabase) {
    return getLocalTributes();
  }

  try {
    const { data, error } = await supabase
      .from('tributes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, using starter data:', error);
      return getLocalTributes();
    }

    if (data && Array.isArray(data)) {
      // Map database snake_case columns to frontend camelCase
      const dbTributes = data
        .filter(item => !deletedIds.includes(item.id))
        .map(item => ({
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
        }));

      // Combine database tributes with base starter tributes (avoiding duplicates)
      const combined = [...dbTributes];
      for (const base of baseTributes) {
        const isDuplicate = dbTributes.some(
          d => d.id === base.id || (d.name === base.name && d.birthdayWish === base.birthdayWish)
        );
        if (!isDuplicate) {
          combined.push(base);
        }
      }

      const finalList = combined.filter(t => !deletedIds.includes(t.id));
      saveLocalTributes(finalList);
      return finalList;
    }

    return baseTributes;
  } catch (err) {
    console.warn('Supabase fetch error, falling back to local data:', err);
    return getLocalTributes();
  }
}

// Save a new tribute to Supabase + LocalStorage
export async function createTribute(tribute) {
  // Fire email notification in background
  sendTributeNotification(tribute).catch((err) => {
    console.warn('Notification trigger caught error:', err);
  });

  if (isSupabaseConfigured && supabase) {
    try {
      const payload = {
        name: tribute.name,
        relationship: tribute.relationship,
        relationship_category: tribute.relationshipCategory,
        three_words: tribute.threeWords,
        appreciation: tribute.appreciation,
        standout_quality: tribute.standoutQuality,
        describe_to_stranger: tribute.describeToStranger,
        birthday_wish: tribute.birthdayWish,
        prayer: tribute.prayer,
        future_message: tribute.futureMessage,
        likes: tribute.likes || 0,
        is_wife: tribute.isWife || false,
        is_approved: tribute.isApproved !== undefined ? tribute.isApproved : false,
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
          date: new Date(data.created_at).toISOString().split('T')[0]
        };
      }
    } catch (err) {
      console.warn('Supabase insert failed, saving locally:', err);
    }
  }

  return tribute;
}

// Approve a tribute in Supabase
export async function approveTributeInDb(id) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('tributes')
        .update({ is_approved: true })
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
      await supabase
        .from('tributes')
        .update({ is_approved: false })
        .eq('id', id);
    } catch (err) {
      console.warn('Supabase hide update failed:', err);
    }
  }
}

// Delete a tribute from Supabase and mark permanently deleted
export async function deleteTributeFromDb(id) {
  // Always mark permanently deleted locally
  markTributeDeletedLocally(id);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('tributes')
        .delete()
        .eq('id', id);

      if (error) {
        console.warn('Supabase delete error, setting is_approved false as fallback:', error);
        await supabase
          .from('tributes')
          .update({ is_approved: false })
          .eq('id', id);
      }
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
