package velma.backend.domain.log;

import org.springframework.data.repository.ListCrudRepository;
import velma.backend.domain.product.Product;

import java.util.List;

public interface LogRepository extends ListCrudRepository<Log, Long> {
    List<Log> findLogsByProductsUsedContaining(List<Product> productsUsed);
}
