import { Cart } from "./Cart";

describe("Cart", () => {
  let cart: Cart;
  const product = {
    title: "Adidas running shoes - men",
    price: 11111, //111.11 | R$ 111,11
  };
  const product2 = {
    title: "Adidas running shoes - men",
    price: 22222, //222.22 | R$ 222,22
  };

  // Garante que antes de cada teste rodar, a variável cart será instanciada uma nova classe de Cart.
  beforeEach(() => {
    cart = new Cart();
  });

  describe("getTotal()", () => {
    test("should return 0 when getTotal() is execute in a newly created instance", () => {
      expect(cart.getTotal()).toEqual(0);
    });
    test("should return multiply and price and receive the total amount", () => {
      cart.add({
        product,
        quantity: 2,
      });
      expect(cart.getTotal()).toEqual(22222);
    });
    test("should return multiply and price and receive the total amount", () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product,
        quantity: 1,
      });
      expect(cart.getTotal()).toEqual(11111);
    });
    test("should update total when a product gets included then removed", () => {
      cart.add({
        product,
        quantity: 2,
      });
      cart.add({
        product: product2,
        quantity: 1,
      });

      cart.remove(product);

      expect(cart.getTotal()).toEqual(22222);
    });
  });
  describe("checkout()", () => {
    test("should return an object with the total the list of items", () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });
    test("should return an object with the total the list of items when summary() is called", () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal()).toBeGreaterThan(0);
    });
    test("should include formatted amount in the summary", () => {
      cart.add({
        product,
        quantity: 5,
      });
      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.summary().formatted).toEqual("R$1,222.21");
    });
    test("should reset the cart when checkout() is called", () => {
      cart.add({
        product: product2,
        quantity: 3,
      });
      cart.checkout();
      expect(cart.getTotal()).toBe(0);
    });
  });
  describe("special conditions", () => {
    test("should apply percentage discount quantity above minimum is passed", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal()).toEqual(23333);
    });
    test("should NOT apply percentage when discount quantity is below or equals minimum", () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };
      cart.add({
        product,
        condition,
        quantity: 2,
      });
      expect(cart.getTotal()).toEqual(22222);
    });
    test("should apply percentage discount for even quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 4,
      });

      expect(cart.getTotal()).toEqual(22222);
    });
    test("should apply percentage discount for odd quantities", () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal()).toEqual(20000);
    });
    test("should NOT apply percentage discount when not according to the condition", () => {
      const condition = {
        quantity: 3,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal()).toEqual(22222);
    });
    test("should recive two or more conditions and determine/apply the best discount. First case. ", () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };
      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal()).toEqual(33333);
    });
  });
});
