#include <iostream>
#include <fstream>
#include <vector>

using namespace std;

void getPathShortest(std::vector<std::vector<int>>& matriz) {
    for (const auto& fila : matriz) {
        for (int elemento : fila) {
            std::cout << elemento << " ";
        }
        std::cout << std::endl;
    }
}

int main() {

    int filas, columnas;
    std::cout << "Ingrese el número de filas: ";
    std::cin >> filas;
    std::cout << "Ingrese el número de columnas: ";
    std::cin >> columnas;

    // Crear la matriz dinámica utilizando vector
    std::vector<std::vector<int>> matriz(filas, std::vector<int>(columnas));

    // Llenar la matriz con valores
    for (int i = 0; i < filas; i++) {
        for (int j = 0; j < columnas; j++) {
            std::cout << "Ingrese el valor para la posición [" << i << "][" << j << "]: ";
            std::cin >> matriz[i][j];
        }
    }

    // Pasar la matriz por referencia a la función
    getPathShortest(matriz);

    return 0;
}
