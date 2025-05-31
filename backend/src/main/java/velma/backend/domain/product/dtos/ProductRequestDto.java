package velma.backend.domain.product.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ProductRequestDto(
        @NotNull String name,
        @Nullable String brand,
        @Nullable String type,
        @Nullable LocalDate expirationDate
) {
}
