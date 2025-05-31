package velma.backend.domain.log.dtos;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import velma.backend.domain.product.Product;

import java.time.LocalDateTime;
import java.util.List;

public record LogRequestDto(
        @NotNull LocalDateTime dateTime,
        @NotNull String routineType,
        @Nullable List<Product> productsUsed,
        @Nullable String notes
) {
}
