package velma.backend.domain.log;

import org.springframework.data.repository.ListCrudRepository;
import velma.backend.domain.product.Product;

import java.util.List;
import java.util.Optional;

public interface LogRepository extends ListCrudRepository<Log, Long> {
    List<Log> findLogsByProductsUsedContaining(List<Product> productsUsed);

    List<Log> findAllByUserId(String userId);

    Optional<Log> findByUserIdAndId(String userId, Long id);
}
