package velma.backend.domain.log.dtos;

import velma.backend.domain.product.Product;

import java.time.LocalDateTime;
import java.util.List;

public record LogListResponseDto(
        Long id,
        LocalDateTime dateTime,
        String routineType,
        List<Product> productsUsed,
        String notes,
        String userId
) {
}
