export function Sum(num1: any, num2: any) {
  // Colocar o sinal + na frente da variável automaticamente transforma ela em numbe, caso o valor dela seja possível ser transformado em number. Parece que ele identifica string vazia como 0.
  const number1 = parseInt(num1);
  const number2 = parseInt(num2);

  if (isNaN(number1) || isNaN(number2)) {
    throw new Error("Impossible parse to number");
  }
  return number1 + number2;
}
