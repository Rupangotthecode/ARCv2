import os
import string

def rename_files(directory):
    # Get all files in the directory
    files = os.listdir(directory)
    
    # Sort the files in ascending order
    files.sort()
    
    # Initialize counters and the prefix
    count = 0
    prefix_index = 0
    
    # Iterate over each file
    for file in files:
        # Get the new name
        prefix = string.ascii_lowercase[prefix_index // 26] + string.ascii_lowercase[prefix_index % 26]
        new_name = f"{prefix}_{count % 3 + 1}{os.path.splitext(file)[1]}"
        
        # Rename the file
        os.rename(os.path.join(directory, file), os.path.join(directory, new_name))
        
        # Increment the count
        count += 1
        
        # If count is a multiple of 3, increment the prefix index
        if count % 3 == 0:
            prefix_index += 1

# Call the function with the directory containing the files
rename_files("D:\\reactjs\\projects\\ARCv2\\server\\data\\B_pronunciation\\Level2")
