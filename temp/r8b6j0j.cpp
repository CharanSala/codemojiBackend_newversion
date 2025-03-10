#include <stdio.h>

// Function to check if a number is prime
int Mystery_box2(int num) {
    if (num < 2) return 0;
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) return 0;
    }
    return 1;
}

// Function to calculate the product of all prime numbers up to num
long long Mystery_box1(int num) {
    long long result = 1;
    for (int i = 2; i <= num; i++) {
        if (Mystery_box2(i)) {
            result *= i;
        }
    }
    return result;
}

// Function to calculate the sum of divisors of a number
long long Mystery_box3(long long num) {
    long long sum = 0;
    for (long long i = 1; i <= num; i++) {
        if (num % i == 0) {
            sum += i;
        }
    }
    return sum;
}

int main() {
    int input;
    scanf("%d", &input);
    long long primeProduct = Mystery_box1(input);
    long long result = Mystery_box3(primeProduct);
    printf("%lld\n", result);
    return 0;
}