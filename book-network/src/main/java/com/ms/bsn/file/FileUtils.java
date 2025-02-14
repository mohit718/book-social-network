package com.ms.bsn.file;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Slf4j
public class FileUtils {

    public static byte[] readFileFromPath(String filePath) {
        if(filePath==null || filePath.isBlank())
            return null;
        try{
            Path path = new File(filePath).toPath();
            return Files.readAllBytes(path);
        }catch (IOException e){
            log.warn("No file found at given path {}", filePath);
        }
        return null;
    }
}

