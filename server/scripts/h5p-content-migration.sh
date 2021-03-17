sourceH5PFolder=public/uploads/h5p
destinationH5PFolder=public/h5p

#enable extglob extension to allows pattern feature matching
shopt -s extglob

librariesFolder=$destinationH5PFolder/libraries

#create libraries folder if it does not exist
mkdir -p $librariesFolder

#Select all content in source
oldContent=$(ls $sourceH5PFolder)

count=0

for folder in $oldContent; do
  echo -e "Copying content in $folder folder .."
  #create content folder if does not exist
  mkdir -p $destinationH5PFolder/content/$folder

  #copy contents  without overwriting
  cp -p -R $sourceH5PFolder/$folder/content/* $destinationH5PFolder/content/$folder

  #copy H5P main definition file  without overwriting
  cp -p  $sourceH5PFolder/$folder/h5p.json $destinationH5PFolder/content/$folder

  #copy libraries without overwriting
  cp -p -R $sourceH5PFolder/$folder/!(content)/ $librariesFolder


  echo -e "Content in $folder migrated into new directory structure \n"
  ((count = count + 1))
done

echo -e "Total migrated content : $count \n. All content migrated successfully"
