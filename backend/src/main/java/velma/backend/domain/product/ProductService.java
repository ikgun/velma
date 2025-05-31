package velma.backend.domain.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Product getById(Long productId) {

        return repository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product with ID " + productId + " not found."));
    }

    public List<Product> listAll() {
        return repository.findAll();
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
        repository.save(newProduct);
        return newProduct;
    }

    public Product updateProduct(Product product) {

        Product updatedProduct = repository.findById(product.getId())
                .orElseThrow(() -> new NoSuchElementException("Product with ID " + product.getId() + " not found."));

        repository.save(updatedProduct);
        return updatedProduct;
    }

    public void deleteProduct(Long productId) {
        repository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product with ID " + productId + " not found."));
        repository.deleteById(productId);
    }

}
