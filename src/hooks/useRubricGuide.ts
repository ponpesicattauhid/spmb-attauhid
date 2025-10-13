import { useEffect, useState } from 'react';
import { supabase, TABLES } from '../lib/supabase';

export type RubricVariant = 'anak' | 'ortu';

// interface RubricGuideRow {
//   id: string;
//   variant: RubricVariant;
//   content: string;
//   updatedAt?: string;
//   updatedBy?: string;
// }

export function useRubricGuide() {
  const [guides, setGuides] = useState<Record<RubricVariant, string>>({ anak: '', ortu: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadGuides = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from(TABLES.RUBRIC_GUIDES)
        .select('*');

      if (error) throw error;

      const next = { anak: '', ortu: '' } as Record<RubricVariant, string>;
      (data || []).forEach((row: any) => {
        next[row.variant as RubricVariant] = row.content || '';
      });
      setGuides(next);
    } catch (e: any) {
      console.error('Error loading rubric guides:', e);
      setError(e?.message || 'Gagal memuat panduan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGuides();
  }, []);

  const saveGuide = async (variant: RubricVariant, content: string, updatedBy?: string) => {
    try {
      const payload = {
        id: `rubric-${variant}`,
        variant,
        content,
        updatedAt: new Date().toISOString(),
        updatedBy: updatedBy || 'admin'
      };
      const { error } = await supabase
        .from(TABLES.RUBRIC_GUIDES)
        .upsert(payload, { onConflict: 'variant' });
      if (error) throw error;
      setGuides((prev) => ({ ...prev, [variant]: content }));
      return true;
    } catch (e: any) {
      console.error('Error saving rubric guide:', e);
      setError(e?.message || 'Gagal menyimpan panduan');
      return false;
    }
  };

  return { guides, loading, error, reload: loadGuides, saveGuide };
}