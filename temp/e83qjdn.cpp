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
int Mystery_box1(int num) {
    int result = 1;
    for (int i = 2; i <= num; i++) {
        if (Mystery_box2(i)) {
            result *= i;
        }
    }
    return result;
}

// Optimized function to calculate the sum of divisors of a number
int Mystery_box3(int num) {
    int sum = 0;
    for (int i = 1; i * i <= num; i++) {
        if (num % i == 0) {
            sum += i;
            if (i != num / i) {  // Avoid adding the same divisor twice for perfect squares
                sum += num / i;
            }
        }
    }
    return sum;
}

int main() {
    int input;
    scanf("%d", &input);
    int primeProduct = Mystery_box1(input);
    int result = Mystery_box3(primeProduct);
    printf("%d\n", result);
    return 0;
}
