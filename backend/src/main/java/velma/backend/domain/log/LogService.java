package velma.backend.domain.log;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import velma.backend.domain.product.Product;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class LogService {

    private final LogRepository repository;

    @Autowired
    public LogService(LogRepository repository) {
        this.repository = repository;
    }

    public Log getById(String userId, Long logId) {
        return repository.findByUserIdAndId(userId, logId)
                .orElseThrow(() -> new NoSuchElementException("Log with ID " + logId + " not found."));
    }


    public List<Log> listAll(String userId) {
        return repository.findAllByUserId(userId);
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


    public Log createLog(LocalDateTime dateTime, String routineType, List<Product> productsUsed, String notes, String userId) {
        Log newLog = new Log();
        newLog.setDateTime(dateTime);
        newLog.setRoutineType(routineType);
        newLog.setProductsUsed(productsUsed);
        newLog.setNotes(notes);
        newLog.setUserId(userId);
        repository.save(newLog);
        return newLog;
    }

    public Log updateLog(String userId, Long logId, LocalDateTime dateTime, String routineType, List<Product> productsUsed, String notes) {
        Log existingLog = getById(userId, logId);

        existingLog.setDateTime(dateTime);
        existingLog.setRoutineType(routineType);
        existingLog.setProductsUsed(productsUsed);
        existingLog.setNotes(notes);

        return repository.save(existingLog);
    }


    public void deleteLog(String userId, Long logId) {
        Log log = getById(userId, logId);
        repository.delete(log);
    }

}
