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

    public Log getById(Long logId) {

        return repository.findById(logId)
                .orElseThrow(() -> new NoSuchElementException("Log with ID " + logId + " not found."));

    }

    public List<Log> listAll() {
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


    public Log createLog(LocalDateTime dateTime, String routineType, List<Product> productsUsed, String notes) {
        Log newLog = new Log();
        newLog.setDateTime(dateTime);
        newLog.setRoutineType(routineType);
        newLog.setProductsUsed(productsUsed);
        newLog.setNotes(notes);
        repository.save(newLog);
        return newLog;
    }

    public Log updateLog(Log log) {

        Log updatedLog = repository.findById(log.getId())
                .orElseThrow(() -> new NoSuchElementException("Log with ID " + log.getId() + " not found."));

        repository.save(updatedLog);
        return updatedLog;
    }

    public void deleteLog(Long logId) {
        repository.findById(logId)
                .orElseThrow(() -> new NoSuchElementException("Log with ID " + logId + " not found."));
        repository.deleteById(logId);
    }

}
