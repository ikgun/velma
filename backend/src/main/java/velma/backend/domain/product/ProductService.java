package velma.backend.domain.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import velma.backend.domain.log.Log;
import velma.backend.domain.log.LogRepository;

import java.time.LocalDate;
import java.util.*;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final LogRepository logRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, LogRepository logRepository) {
        this.productRepository = productRepository;
        this.logRepository = logRepository;
    }

    public Product getById(String userId, Long productId) {
        return productRepository.findByUserIdAndId(userId,productId)
                .orElseThrow(() -> new NoSuchElementException("Log with ID " + productId + " not found."));
    }

    public List<Product> listAll(String userId) {
        return productRepository.findAllByUserId(userId);
    }

//    public List<Log> listAllByQuery(String queryTerm) {
//        String lowerQuery = queryTerm.toLowerCase().trim();
//        List<Recipe> matchingRecipes = new ArrayList<>();
//
//        for (Recipe recipe : repository.findAll() /*had recipes.values()*/) {
//
//            String[] titleWords = recipe.getTitle().toLowerCase().split("\\W+");
//            String[] ingredientWords = recipe.getIngredients().toLowerCase().split("\\W+");
//
//            boolean titleMatch = Arrays.asList(titleWords).contains(lowerQuery);
//            boolean ingredientsMatch = Arrays.asList(ingredientWords).contains(lowerQuery);
//
//            if (titleMatch || ingredientsMatch) {
//                matchingRecipes.add(recipe);
//            }
//        }
//
//        return matchingRecipes;
//    }


    public Product createProduct(String name, String brand, String type, LocalDate expirationDate, String userId) {
        Product newProduct = new Product();
        newProduct.setName(name);
        newProduct.setBrand(brand);
        newProduct.setType(type);
        newProduct.setExpirationDate(expirationDate);
        newProduct.setUserId(userId);
        productRepository.save(newProduct);
        return newProduct;
    }

    public Product updateProduct(Long productId, String name, String brand, String type, LocalDate expirationDate, String userId) {
        Product existingProduct = getById(userId, productId);

        existingProduct.setName(name);
        existingProduct.setBrand(brand);
        existingProduct.setExpirationDate(expirationDate);
        existingProduct.setType(type);

        return productRepository.save(existingProduct);
    }

    public void deleteProduct(String userId, Long productId) {
        Product product = getById(userId, productId);
        List<Log> logsContainingProduct = logRepository.findLogsByProductsUsedContaining(List.of(product));
        for (Log log : logsContainingProduct) {
            log.getProductsUsed().remove(product);
            logRepository.save(log);
        }
        productRepository.delete(product);
    }

}
