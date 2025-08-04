#include <iostream>
using namespace std;

int main() {
    cout << "Praktikum C++: Kondisional" << endl;

    uint umur
    cout << "Umur anda saat ini berapa? ";
    cin >> umur;

    if (umur < 18) {
        cout << "Anda masih di bawah umur." << endl;
    } else if (umur >= 18 && umur < 60) {
        cout << "Anda sudah dewasa." << endl;
    } else {
        cout << "Anda sudah Lansia." << endl;
    }

    return 0;
}