package in.Sumit.foodiesapi.service;

import in.Sumit.foodiesapi.io.UserRequest;
import in.Sumit.foodiesapi.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
