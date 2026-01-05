// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, CardContent, Grid, Typography, useMediaQuery } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';

// assets
import CloseIcon from '@mui/icons-material/Close';
import { TicketFilters } from 'types/filters/TicketFilters';
import { FormattedMessage } from 'react-intl';

interface TicketFiltersViewProps {
  filter: TicketFilters;
  initialState: TicketFilters;
  filterIsEqual: (initialState: TicketFilters, filter: TicketFilters) => boolean;
  handleFilter: (type: string, params: any) => void;
}

// ==============================|| TICKET GRID - FILTER VIEW ||============================== //

const FiltersHeader = ({ filter, filterIsEqual, handleFilter, initialState }: TicketFiltersViewProps) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {!filterIsEqual(initialState, filter) && (
        <Grid container spacing={gridSpacing} sx={{ pb: gridSpacing }} alignItems="center">
           {!(initialState.from_date === filter.from_date) && (
            <Grid item>
              <SubCard content={false}>
                <CardContent sx={{ pb: '12px !important', p: 1.5 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Typography variant="subtitle1">
                        <FormattedMessage id='date_from' />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={filter?.from_date}
                        chipcolor="primary"
                        sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </SubCard>
            </Grid>
          )}
          {!(initialState.to_date === filter.to_date) && (
            <Grid item>
              <SubCard content={false}>
                <CardContent sx={{ pb: '12px !important', p: 1.5 }}>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <Typography variant="subtitle1">
                        <FormattedMessage id='date_to' />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        size={matchDownMD ? 'small' : undefined}
                        label={filter?.to_date}
                        chipcolor="primary"
                        sx={{ borderRadius: '4px', textTransform: 'capitalize' }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </SubCard>
            </Grid>
          )}
          <Grid item>
            <Button variant="outlined" startIcon={<CloseIcon />} color="error" onClick={() => handleFilter('reset', '')}>
              Clear All
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default FiltersHeader;
