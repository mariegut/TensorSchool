function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  
let arr1=[];
let k=1;
let r;

while(k<=100)
{
    r=getRandomInRange(0,99);
    if(!arr1[r])
    {
        arr1[r]=k;
        k++;
    }
}

let arr2=arr1.map(function(n) {
    return arr1[99-arr1.indexOf(n)];
});

let arr3=arr1.map(function(n) {
    return arr1[arr1.indexOf(n)]-arr2[arr1.indexOf(n)];
});

let sum=arr3.reduce(function(acc,n) {
    return acc+n;
})/100;

console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log(sum);