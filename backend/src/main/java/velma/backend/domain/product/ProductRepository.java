package velma.backend.domain.product;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends ListCrudRepository<Product, Long> {
    Optional<Product> findByUserIdAndId(String userId, Long id);

    List<Product> findAllByUserId(String userId);
}
