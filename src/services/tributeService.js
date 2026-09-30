import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { INITIAL_TRIBUTES } from '../data/initialData';

const LOCAL_STORAGE_KEY = 'dami_birthday_tributes';

export function getLocalTributes() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_TRIBUTES;
  } catch {
    return INITIAL_TRIBUTES;
  }
}

export function saveLocalTributes(tributes) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tributes));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// Fetch tributes from Supabase or fallback to LocalStorage
export async function fetchTributes() {
  if (!isSupabaseConfigured || !supabase) {
    return getLocalTributes();
  }

  try {
    const { data, error } = await supabase
      .from('tributes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      // Map database snake_case columns to frontend camelCase
      const mapped = data.map(item => ({
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
        isApproved: item.is_approved !== undefined ? item.is_approved : true,
        photoUrl: item.photo_url || null,
        date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
      }));
      return mapped;
    } else {
      // Seed initial tributes if database is freshly created
      const seedPayloads = INITIAL_TRIBUTES.map(t => ({
        name: t.name,
        relationship: t.relationship,
        relationship_category: t.relationshipCategory,
        three_words: t.threeWords,
        appreciation: t.appreciation,
        standout_quality: t.standoutQuality,
        describe_to_stranger: t.describeToStranger,
        birthday_wish: t.birthdayWish,
        prayer: t.prayer,
        future_message: t.futureMessage,
        likes: t.likes || 0,
        is_wife: t.isWife || false,
        is_approved: true,
        photo_url: t.photoUrl || null
      }));

      const { data: inserted } = await supabase
        .from('tributes')
        .insert(seedPayloads)
        .select();

      if (inserted && inserted.length > 0) {
        return inserted.map(item => ({
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
          isApproved: item.is_approved !== undefined ? item.is_approved : true,
          photoUrl: item.photo_url || null,
          date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        }));
      }

      return getLocalTributes();
    }
  } catch (err) {
    console.warn('Supabase fetch error, falling back to local data:', err);
    return getLocalTributes();
  }
}

// Save a new tribute to Supabase + LocalStorage
export async function createTribute(tribute) {
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

// Delete a tribute from Supabase
export async function deleteTributeFromDb(id) {
  if (isSupabaseConfigured && supabase) {
    try {
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

// Subscribe to real-time additions
export function subscribeToRealtimeTributes(onNewTribute) {
  if (!isSupabaseConfigured || !supabase) return () => {};

  const channel = supabase
    .channel('public:tributes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'tributes' },
      (payload) => {
        const item = payload.new;
        const newTribute = {
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
          photoUrl: item.photo_url || null,
          date: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
        };
        onNewTribute(newTribute);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
