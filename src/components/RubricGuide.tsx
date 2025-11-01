import { useEffect, useState } from 'react';
import { supabase, TABLES } from '../lib/supabase';

interface RubricGuideProps {
  variant: 'anak' | 'ortu';
  onClose?: () => void;
}

export default function RubricGuide({ variant, onClose }: RubricGuideProps) {
  const [customContent, setCustomContent] = useState<string>('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase
          .from(TABLES.RUBRIC_GUIDES)
          .select('content')
          .eq('variant', variant)
          .limit(1)
          .single();
        if (!error && data?.content) {
          if (mounted) setCustomContent(data.content);
        }
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoaded(true);
      }
    })();
    return () => { mounted = false; };
  }, [variant]);
  return (
    <div className="p-4 bg-white rounded-md shadow border text-sm max-h-[70vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-base">Panduan Penilaian — {variant === 'anak' ? 'Calon Siswa' : 'Orang Tua'}</h2>
        {onClose && (
          <button onClick={onClose} className="text-gray-600 hover:text-black px-3 py-2 md:px-2 md:py-1 rounded-lg border border-gray-200">Tutup</button>
        )}
      </div>
      <div className="space-y-3">
        {loaded && customContent && (
          <section>
            <h3 className="font-semibold">Panduan Kustom (Admin)</h3>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap text-gray-700">{customContent}</p>
            </div>
          </section>
        )}
        <section>
          <h3 className="font-semibold">Definisi Level (umum)</h3>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>1 — Sangat Kurang: tidak menunjukkan indikator yang diharapkan; sering butuh arahan; tidak konsisten.</li>
            <li>2 — Kurang: sebagian kecil indikator muncul; perlu banyak bantuan; sering tidak tepat.</li>
            <li>3 — Cukup: indikator muncul secara dasar; cukup konsisten; masih ada kekurangan.</li>
            <li>4 — Baik: indikator muncul jelas; konsisten; hanya kekurangan kecil.</li>
            <li>5 — Sangat Baik: indikator kuat, konsisten, mandiri; melebihi harapan.</li>
          </ul>
        </section>

        {variant === 'anak' && (
          <section>
            <h3 className="font-semibold">Contoh Rubrik (Calon Siswa)</h3>
            <div className="mt-1">
              <p className="font-medium">Kemampuan Membaca</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1: belum mengenal huruf; tidak mampu membentuk suku kata.</li>
                <li>2: mengenal sebagian huruf; membaca terputus-putus dengan banyak salah.</li>
                <li>3: membaca kata sederhana; kesalahan masih ada namun dipahami.</li>
                <li>4: membaca lancar teks pendek; intonasi cukup; sedikit salah.</li>
                <li>5: membaca lancar teks variatif; intonasi dan pemahaman baik.</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-medium">Jumlah Hafalan</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1: belum ada hafalan (0–1 baris).</li>
                <li>2: hafalan sangat sedikit (2–4 baris); sering salah.</li>
                <li>3: hafalan dasar (5–8 baris); ada koreksi.</li>
                <li>4: hafalan cukup (9–12 baris); ketepatan baik.</li>
                <li>5: hafalan kuat (13–15 baris); tepat dan mantap.</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-medium">Sholat Lima Waktu</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1: hampir tidak sholat; tidak ada komitmen.</li>
                <li>2: sholat jarang; perlu dorongan kuat.</li>
                <li>3: sholat sebagian; kadang lalai tanpa alasan kuat.</li>
                <li>4: sholat konsisten; sesekali luput dengan alasan jelas.</li>
                <li>5: sholat rutin; disiplin; komitmen kuat.</li>
              </ul>
            </div>
          </section>
        )}

        {variant === 'ortu' && (
          <section>
            <h3 className="font-semibold">Contoh Rubrik (Orang Tua)</h3>
            <div className="mt-1">
              <p className="font-medium">Kesanggupan membimbing hafalan di rumah</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1: tidak sanggup; tidak ada waktu/komitmen.</li>
                <li>2: sanggup terbatas; tanpa rencana jelas.</li>
                <li>3: sanggup dengan rencana dasar; konsistensi sedang.</li>
                <li>4: sanggup dengan rencana terstruktur; konsisten.</li>
                <li>5: sangat sanggup; rencana detail; komitmen tinggi.</li>
              </ul>
            </div>
            <div className="mt-2">
              <p className="font-medium">Penampilan orang tua (rapi, sopan, profesional)</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>1: tidak sopan/berantakan; tidak sesuai etika.</li>
                <li>2: kurang rapi; beberapa hal tidak sesuai.</li>
                <li>3: cukup rapi; sesuai minimal.</li>
                <li>4: rapi; sesuai norma; positif.</li>
                <li>5: sangat rapi; sangat mencerminkan teladan.</li>
              </ul>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}