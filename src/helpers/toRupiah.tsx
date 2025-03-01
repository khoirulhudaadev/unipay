const toRupiah = (angka: any) => {
  // Pastikan angka valid
  if (isNaN(angka)) return 'Data tidak valid';

  // Format angka dengan pemisah ribuan
  const formatted = angka.toLocaleString('id-ID');

  // Gabungkan dengan "Rp" tanpa spasi
  return `Rp${formatted}`;
};

export default toRupiah;
