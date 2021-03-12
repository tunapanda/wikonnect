sourceH5PFolder=../public/uplaods/h5p/
destinationH5PFolder=../public/h5p/




#enable extglob extension to allows pattern feature matching
shopt -s extglob


librariesFolder=$destinationH5PFolder/libraries

#create libraries folder if it does not exist
mkdir -p $librariesFolder


#Select all content in source
oldContent=$(ls $sourceH5PFolder )


for folder in $oldContent
    do

        #create content folder if does not exist
        mkdir -p $destinationH5PFolder/content/$folder

        #copy contents
        cp -v -p -R -i $sourceH5PFolder/$folder/content/* $destinationH5PFolder/content/$folder

        #copy H5P main definition file
        cp -v -p  $sourceH5PFolder/$folder/h5p.json $destinationH5PFolder/content/$folder

        #copy libraries without overwriting
        cp -v -p  -n  -R $sourceH5PFolder/$folder/!(content)/ $librariesFolder

done
