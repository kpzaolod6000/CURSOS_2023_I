#include <iostream>
#include <fstream>
#include <vector>
#include <limits.h>

using namespace std;

class Matrixpath
{
private:
    int i;
    int j;
    int sum_;
public:
    Matrixpath(int i, int j, int sum_);
    int getI();
    int getJ();
    int getSUM_();
    ~Matrixpath();
};

int Matrixpath::getI()
{
    return i;
}

int Matrixpath::getJ()
{
    return j;
}

int Matrixpath::getSUM_()
{
    return sum_;
}

Matrixpath::Matrixpath(int i, int j, int sum_)
{
    this->i = i;
    this->j = j;
    this->sum_ = sum_;
}

Matrixpath::~Matrixpath()
{
}


void getPathShortest(vector<vector<int>>& matrix) {

    int i = 0, j = 0;
    int n = matrix.size()-1;
    int m = matrix[0].size()-1;

    vector<Matrixpath*> pathAcc;
    int right = 0;
    int bottom = 0;
    int sumR = 0;
    int sumB = 0;
    int minimun_ = INT_MAX;
    int sumTotal = 0;

    while ((i != n || j != m) && (i != j))
    {
        right = j+1;
        bottom = i+1;
        if (pathAcc.size() == 0){
            sumR = matrix[i][j] + matrix[i][right];
            sumB = matrix[i][j] + matrix[bottom][j];

            Matrixpath* matrixpathR = new Matrixpath(i,right,sumR);
            Matrixpath* matrixpathB = new Matrixpath(i,bottom,sumB);
            pathAcc.push_back(matrixpathR);
            pathAcc.push_back(matrixpathB);

            if (sumR > sumB) {
                i = bottom;
                sumTotal += sumB; 
            }
            else {
                j = right;
                sumTotal += sumR;
            }

        }else{

            sumR = sumTotal + matrix[i][right];
            sumB = sumTotal + matrix[bottom][j];

            Matrixpath* matrixpathR = new Matrixpath(i,right,sumR);
            Matrixpath* matrixpathB = new Matrixpath(i,bottom,sumB);
            pathAcc.push_back(matrixpathR);
            pathAcc.push_back(matrixpathB);

            int index = 0;
            for (size_t k = 0; k < pathAcc.size(); k++)
            {
                if (pathAcc[k]->getSUM_() <= minimun_)
                {
                    minimun_ = pathAcc[k]->getSUM_();
                    index = k;
                }
            }
            i = pathAcc[index]->getI();
            j = pathAcc[index]->getJ();
            sumTotal = pathAcc[index]->getSUM_();
            
        }

    }
    
    // for (size_t i = 0; i < matrix.size(); i++)
    // {
    //     for (size_t j = 0; j < matrix[i].size(); j++)
    //     {
    //         cout << matrix[i][j] << " ";
    //     }
    //     cout<<endl;
    // }
    
    // for (const auto& row : matriz) {
    //     for (int element : row) {
    //         cout << element << " ";
    //     }
    //     cout <<endl;
    // }
}

int main() {

    int rows, columns;
    ifstream archivo("matriz.txt");
    archivo >> rows >> columns;

    vector<vector<int>> matrix(rows, vector<int>(columns));

    // Leer los valores de la matriz desde el archivo
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < columns; j++) {
            archivo >> matrix[i][j];
        }
    }

    archivo.close(); // Cerrar el archivo

    // Pasar la matriz por referencia a la función
    getPathShortest(matrix);

    return 0;
}
