import "./styles.css";

import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import { Genre } from "types/genre";
import { useEffect, useState } from "react";
import { requestBackend } from "util/request";

export type GenreFilterData = {
    genre: Genre | null;
}

type Props = {
    onSubmitGenre: (data: GenreFilterData) => void;
}

const MovieFilter = ({ onSubmitGenre } : Props) => {

    const { setValue, getValues, control } = useForm<GenreFilterData>();
    const [selectGenre, setSelectGenre] = useState<Genre[]>([])

    const handleChangeGenre = (value : Genre) => {
        setValue('genre', value)

        const obj : GenreFilterData = {
            genre: getValues('genre')
        }
        onSubmitGenre(obj);
    }

    useEffect(() => {
        requestBackend({ url: '/genres', withCredentials: true})
            .then((response) => {
            setSelectGenre(response.data);
            console.log(response.data);
          });
        }, []);
    
    return(
        <form className="genre-filter-container">
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectGenre}
                  classNamePrefix="genre-filter-select"
                  onChange={(value) => handleChangeGenre(value as Genre)}
                  isClearable
                  placeholder="Gênero"
                  getOptionLabel={(genre: Genre) => genre.name}
                  getOptionValue={(genre: Genre) => String(genre.id)}
                />
              )}
            />
        </form>
    );
}

export default MovieFilter;