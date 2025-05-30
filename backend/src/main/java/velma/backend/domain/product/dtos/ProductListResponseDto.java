package velma.backend.domain.product.dtos;

import java.time.LocalDate;

public record ProductListResponseDto(
        Long id,
        String name,
        String brand,
        String type,
        Long userId,
        LocalDate expirationDate
) {
}
