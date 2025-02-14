package com.ms.bsn.file;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static java.io.File.separator;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${application.file.uploads.file-upload-path}")
    private String rootUploadPath;

    public String saveFile(@NonNull MultipartFile file, @NonNull Integer userId) {
        final String fileUploadPath = rootUploadPath + separator + "users" + separator + userId;
        return uploadFile(file, fileUploadPath);
    }

    private String uploadFile(@NonNull MultipartFile file, @NonNull String fileUploadPath) {
        File targetDir = new File(fileUploadPath);
        if (!targetDir.exists()) {
            if (!targetDir.mkdirs())
                log.warn("Failed to create the target directory.");
        }

        final String fileExt = FilenameUtils.getExtension(file.getOriginalFilename());

        String fullFileName = fileUploadPath + separator + System.currentTimeMillis() + "." + fileExt;
        Path targetPath = Paths.get(fullFileName);

        try {
            Files.write(targetPath, file.getBytes());
            log.info("File was saved to {}", fullFileName);
        } catch (IOException ex) {
            log.warn("Unable to upload the file {}", String.valueOf(ex));
        }
        return fullFileName;
    }
}
