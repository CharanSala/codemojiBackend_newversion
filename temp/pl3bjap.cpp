#include<stdio.h>

    int m2(int a){
        int q=1;
        for(int i=0;i<=a;i++){
            q*=i;
        }
        return q;
    }
    int m1(int a){
        int f=0;
        while(a>0){
            int g=a%10;
            f+=m2(g);
            a/=10;
        }
        return f;
    }
    int m3(int a){
        int h=0;
        while(a>0){
            int y=a%10;
            h+=(y*y*y);
            a/=10;
        }
        return h;
    }
   int main(){
    int p;
    scanf("%d",&p);
    int z=m1(p);
    int l=m3(z);
    printf("%d",l);

}