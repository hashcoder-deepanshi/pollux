import * as React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';


const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0),
}));

export default function ChipsArray() {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    
      <div className="blogchips">
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.key} >
            <Chip
              sx={{width:350 , height:50 , backgroundColor:'white',color:'black', padding:0,fontSize:'20px', fontFamily:'Montserrat'}}
              icon={icon}
              label={data.label}
              onDelete={(handleDelete(data))}
            />
          </ListItem>
        );
      })}
      </div>
        );
}
