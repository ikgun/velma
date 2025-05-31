package velma.backend.domain.product;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import velma.backend.domain.product.dtos.ProductListResponseDto;
import velma.backend.domain.product.dtos.ProductRequestDto;
import velma.backend.domain.product.dtos.ProductResponseDto;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    public static final String API_CONTEXT_ROOT = "/api/products";

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<?> listProducts() {
        List<ProductListResponseDto> response = productService.listAll()
                .stream()
                .map(product -> new ProductListResponseDto(product.getId(),
                        product.getName(), product.getBrand(), product.getType(), product.getUserId(), product.getExpirationDate()))
                .toList();

        if (response.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No products found.");
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getProduct(@PathVariable String id) {

        Product product = productService.getById(validateProductId(id));
        return ResponseEntity.ok(ProductResponseDto.fromProduct(product));

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
    public ResponseEntity<?> createProduct(@RequestBody @Valid ProductRequestDto dto){

        Product product = productService.createProduct(dto.name(), dto.brand(), dto.type(), dto.expirationDate());

        return ResponseEntity
                .created(URI.create(API_CONTEXT_ROOT + "/" + product.getId()))
                .body(ProductResponseDto.fromProduct(product));

    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable String id,
            @RequestBody @Valid ProductRequestDto dto) {

        Product product = productService.getById(validateProductId(id));

        product.setName(dto.name());
        product.setBrand(dto.brand());
        product.setType(dto.type());
        product.setExpirationDate(dto.expirationDate());

        Product updatedProduct = productService.updateProduct(product);

        return ResponseEntity.ok(ProductResponseDto.fromProduct(updatedProduct));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(validateProductId(id));
        return ResponseEntity.noContent().build();
    }

    private Long validateProductId(String id) {
        try {
            return Long.parseLong(id);
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Invalid product ID format: must be a number.");

        }
    }

}
