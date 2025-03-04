i=int(input())
print(i*2)#include <stdio.h>

// Function to calculate factorial of a digit
int factorial(int num) {
    int fact = 1;
    for (int i = 1; i <= num; i++) {
        fact *= i;
    }
    return fact;
}

// Function to calculate sum of factorial of digits
int sumOfFactorials(int num) {
    int sum = 0;
    while (num > 0) {
        int digit = num % 10;
        sum += factorial(digit);
        num /= 10;
    }
    return sum;
}

// Function to calculate sum of cubes of digits
int sumOfCubes(int num) {
    int sum = 0;
    while (num > 0) {
        int digit = num % 10;
        sum += (digit * digit * digit);
        num /= 10;
    }
    return sum;
}

int main() {
    int num;
    printf("Enter a number: ");
    scanf("%d", &num);
    
    int newNum = sumOfFactorials(num); // Step 1: Calculate sum of factorials
    int result = sumOfCubes(newNum);   // Step 2: Calculate sum of cubes
    
    printf("Result: %d\n", result);
    
    return 0;
}
