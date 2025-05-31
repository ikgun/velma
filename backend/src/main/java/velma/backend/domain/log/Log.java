package velma.backend.domain.log;

import jakarta.persistence.*;
import velma.backend.domain.product.Product;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    LocalDateTime dateTime;

    @Column(nullable = false)
    private String routineType; //Morning or evening

    @ManyToMany
    @JoinTable(
            name = "log_product",
            joinColumns = @JoinColumn(name = "log_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> productsUsed;

    private String notes;

    @Column(name = "user_id", nullable = false)
    private String userId;

    public Log() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getRoutineType() {
        return routineType;
    }

    public void setRoutineType(String routineType) {
        this.routineType = routineType;
    }

    public List<Product> getProductsUsed() {
        return productsUsed;
    }

    public void setProductsUsed(List<Product> productsUsed) {
        this.productsUsed = productsUsed;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
