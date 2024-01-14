import { Autocomplete, TextField } from "@mui/material";

const SoftAutoSelect = (props) => {
    const { dataList, selectedValue, selectHandler, label, placeholder, isClearable } = props;

    return (
        <Autocomplete
            id="soft-auto-select"
            value={selectedValue || null}
            onChange={selectHandler}
            options={dataList || []}
            getOptionLabel={(option) => option.value || ""}
            disableClearable={true}
            renderInput={(params) => (
                <TextField {...params} label={label} placeholder={placeholder} />
            )}
        />
    );
};

export default SoftAutoSelect;
