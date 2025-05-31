package velma.backend.domain.product.dtos;

import velma.backend.domain.product.Product;

import java.time.LocalDate;

public record ProductResponseDto(Long id,
                                 String name,
                                 String brand,
                                 String type,
                                 String userId,
                                 LocalDate expirationDate) {

    public static ProductResponseDto fromProduct(Product product) {
        return new ProductResponseDto(product.getId(), product.getName(), product.getBrand(), product.getType(), product.getUserId(), product.getExpirationDate());
    }
}
