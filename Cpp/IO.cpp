#include <iostream>
using namespace std;

int main() {
    // Ini adalah contoh Output dengan menggunakan `cout` dan `endl` sebagai penanda akhir baris.
    cout << "Halo, Semua" << endl;

    // Contoh Input dengan menggunakan `cin`.
    // Sebelumnya kita harus mendeklarasikan variabel yang nantinya akan menyimpan input.
    string nama;

    cout << "Masukkan Nama anda: ";
    cin >> nama;
    cout << "Anda memasukkan nama: " << nama << endl;

    return 0;
}