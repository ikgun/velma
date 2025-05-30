package velma.backend.domain.product.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ProductRequestDto(
        @NotNull String name,
        @NotNull String brand,
        @NotNull String type,
        @NotNull LocalDate expirationDate
) {
}
