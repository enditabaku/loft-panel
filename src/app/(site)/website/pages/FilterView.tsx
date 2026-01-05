// material-ui
import {
  Button,
  CardContent,
  Grid,
  Stack,
  Theme,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Accordion from 'ui-component/extended/Accordion';
import { gridSpacing } from 'store/constant';
import { TicketFilters } from 'types/filters/TicketFilters';
import DateRangeFilter from 'filters/DateRangeFilter';

// third-party
import { FormattedMessage, useIntl } from 'react-intl';


// ==============================|| FEEDBACK GRID - FILTER ||============================== //

const FilterView = ({
  filter,
  handleFilter
}: {
  filter: TicketFilters;
  handleFilter: (type: string, params: string, rating?: number) => void;
}) => {
  
  const theme = useTheme();
  const { formatMessage } = useIntl();
  const matchDownLG = useMediaQuery((theme2: Theme) => theme2.breakpoints.down('xl'));

  const filterData = [
    {
      id: 'date',
      defaultExpand: true,
      title: `${formatMessage({id: "date_range"})}`,
      content: <DateRangeFilter handleFilter={handleFilter} />
    }
  ];

  return (
    <MainCard border={!matchDownLG} content={false} sx={{ overflow: 'visible' }}>
      <CardContent sx={{ p: 1, height: matchDownLG ? '100vh' : 'auto' }}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Accordion data={filterData} />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Button variant="outlined" fullWidth color="inherit" sx={{ background: theme.palette.mode == 'dark' ? 'none' : theme.palette.grey[900], color: theme.palette.mode == 'dark' ? theme.palette.grey[900] : theme.palette.primary.light}} onClick={() => handleFilter('reset', '')}>
                <FormattedMessage id='clear_all' />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </MainCard>
  );
};

export default FilterView;