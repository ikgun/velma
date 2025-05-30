package velma.backend.domain.log.dtos;


import velma.backend.domain.log.Log;
import velma.backend.domain.product.Product;

import java.time.LocalDateTime;
import java.util.List;

public record LogResponseDto(Long id,
                             LocalDateTime dateTime,
                             String routineType,
                             List<Product> productsUsed,
                             String notes,
                             Long userId) {

    public static LogResponseDto fromLog(Log log) {
        return new LogResponseDto(log.getId(), log.getDateTime(), log.getRoutineType(), log.getProductsUsed(), log.getNotes(), log.getUserId());
    }
}
