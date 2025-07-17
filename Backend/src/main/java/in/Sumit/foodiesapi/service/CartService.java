package in.Sumit.foodiesapi.service;

import in.Sumit.foodiesapi.io.CartRequest;
import in.Sumit.foodiesapi.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
