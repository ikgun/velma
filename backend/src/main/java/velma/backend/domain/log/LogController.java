package velma.backend.domain.log;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import velma.backend.domain.log.dtos.LogListResponseDto;
import velma.backend.domain.log.dtos.LogRequestDto;
import velma.backend.domain.log.dtos.LogResponseDto;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
@CrossOrigin
public class LogController {

    public static final String API_CONTEXT_ROOT = "/api/logs";

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public ResponseEntity<?> listLogs() {
        List<LogListResponseDto> response = logService.listAll()
                .stream()
                .map(log -> new LogListResponseDto(log.getId(),
                        log.getDateTime(), log.getRoutineType(), log.getProductsUsed(), log.getNotes(), log.getUserId()))
                .toList();

        if (response.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No logs found.");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getLog(@PathVariable String id) {

        Log log = logService.getById(validateLogId(id));
        return ResponseEntity.ok(LogResponseDto.fromLog(log));

    }

//    @GetMapping(path = "/search")
//    public ResponseEntity<?> getAllByQuery(@RequestParam String query) {
//        List<ProductListResponseDto> response = logService.listAllByQuery(query)
//                .stream()
//                .map(recipe -> new RecipeListResponseDto(recipe.getId(),
//                        recipe.getTitle(), recipe.getIngredients(), recipe.getInstructions(), recipe.getImage()))
//                .toList();
//
//        if (response.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No recipes found.");
//        }
//
//        return ResponseEntity.ok(response);
//    }

    @PostMapping
    public ResponseEntity<?> createLog(@RequestBody @Valid LogRequestDto dto){

        Log log = logService.createLog(dto.dateTime(), dto.routineType(), dto.productsUsed(), dto.notes());

        return ResponseEntity
                .created(URI.create(API_CONTEXT_ROOT + "/" + log.getId()))
                .body(LogResponseDto.fromLog(log));

    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateLog(
            @PathVariable String id,
            @RequestBody @Valid LogRequestDto dto) {

        Log log = logService.getById(validateLogId(id));

        log.setDateTime(dto.dateTime());
        log.setRoutineType(dto.routineType());
        log.setProductsUsed(dto.productsUsed());
        log.setNotes(dto.notes());

        Log updatedLog = logService.updateLog(log);

        return ResponseEntity.ok(LogResponseDto.fromLog(updatedLog));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLog(@PathVariable String id) {
        logService.deleteLog(validateLogId(id));
        return ResponseEntity.noContent().build();
    }

    private Long validateLogId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid log ID format: must be a number.");

        }
    }

}
