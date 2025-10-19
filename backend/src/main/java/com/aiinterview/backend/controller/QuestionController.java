package com.aiinterview.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.util.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")  // allow frontend requests from any domain
public class QuestionController {

    @PostMapping("/recommend")
    public ResponseEntity<List<String>> recommend(@RequestBody Map<String, String> payload) {
        String skill = payload.getOrDefault("skill", "Java").toLowerCase();
        List<String> questions = new ArrayList<>();

        switch (skill) {
            case "java":
                questions.add("What is JVM and how does it differ from JRE and JDK?");
                questions.add("Explain the differences between HashMap and TreeMap.");
                questions.add("What are Java Streams and how are they used?");
                questions.add("Describe multithreading in Java and how synchronization works.");
                questions.add("Explain the concept of garbage collection in Java.");
                break;

            case "react":
                questions.add("What are React components and their types?");
                questions.add("Explain the concept of Virtual DOM in React.");
                questions.add("What are React hooks and give examples?");
                questions.add("How does state management work in React?");
                questions.add("What are props in React and how are they used?");
                break;

            case "javascript":
                questions.add("What is the difference between var, let, and const?");
                questions.add("Explain closures in JavaScript with an example.");
                questions.add("What is event bubbling and event delegation?");
                questions.add("Describe promises and async/await in JavaScript.");
                questions.add("Explain the difference between == and === in JavaScript.");
                break;

            case "ai":
            case "llm":
                questions.add("What is a Large Language Model (LLM) and how does it work?");
                questions.add("Explain the difference between supervised and unsupervised learning.");
                questions.add("What is fine-tuning in AI models?");
                questions.add("Describe the concept of embeddings in LLMs.");
                questions.add("What are the limitations of current AI models?");
                break;

            case "rag":
                questions.add("What is Retrieval-Augmented Generation (RAG) in AI?");
                questions.add("How does RAG combine retrieval and generation models?");
                questions.add("Explain vector databases in the context of RAG.");
                questions.add("What are the benefits of using RAG for question answering?");
                questions.add("Describe the process of integrating RAG with an LLM.");
                break;

            default:
                // Generic fallback questions
                questions.add("Sample Question 1 for " + skill);
                questions.add("Sample Question 2 for " + skill);
                questions.add("Sample Question 3 for " + skill);
                questions.add("Sample Question 4 for " + skill);
                questions.add("Sample Question 5 for " + skill);
        }

        return ResponseEntity.ok(questions);
    }
}
