#include <stdio.h>

// Mystery_box2: Computes the factorial of a number.
int Mystery_box2(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Mystery_box1: Sums the factorials of each digit in the number.
int Mystery_box1(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += Mystery_box2(digit);
        n /= 10;
    }
    return sum;
}

// Mystery_box3: Sums the cubes of each digit in the number.
int Mystery_box3(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit * digit;
        n /= 10;
    }
    return sum;
}

int main() {
    int input;
    // Read input number
    scanf("%d", &input);

    // Compute intermediate result: sum of factorials of digits
    int result1 = Mystery_box1(input);
    // Compute final result: sum of cubes of digits of the intermediate result
    int result2 = Mystery_box3(result1);

    // Print the final result
    printf("%d\n", result2);
    return 0;
}