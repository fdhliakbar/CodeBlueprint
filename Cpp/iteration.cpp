#include <iostream>
using namespace std;

int main() {
    cout << "Praktikum C++: Iterasi" << "\n\n";

    // Perulangan for adalah sebuah perulangan yang paling umum digunakan
    for (int i = 0; i < 5; i++) {
        cout << "Perulangan ke-" << i << endl;
    }
    cout << "\n";

    // Perulangan while adalah perulangan yang akan terus berjalan selama kondisi yang diberikan bernilai true
    int j = 0;
    while (j < 5) {
        cout << "Perulangan ke-" << j << endl;
        j++;
    }
    cout << "\n";

    // Perulangan do-while adalah perulangan yang akan selalu dijalankan minimal satu kali
    int k = 0;
    do {
        cout << "Perulangan ke-" << k << endl;
        k++;
    } while (k < 5);
    cout << "\n";

    // Perulangan range-based for adalah perulangan yang digunakan untuk mengiterasi elemen dalam sebuah koleksi
    int arr[] = {1, 2, 3, 4, 5};
    cout << "Iterasi menggunakan range-based for:" << endl;
    for (int i : arr) {
        cout << "Perulangan ke-" << i << endl;
    }
    return 0;
}