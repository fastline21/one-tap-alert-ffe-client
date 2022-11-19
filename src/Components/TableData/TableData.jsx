import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Button,
  Typography,
  TablePagination,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

const TableData = ({
  head = [],
  data = [],
  source = 'users',
  view,
  edit,
  remove,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (id) => {
    view(id);
  };

  const handleEdit = (id) => {
    edit(id);
  };

  const handleRemove = (id) => {
    remove(id);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 390, minHeight: 390 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {head.map((element, index) => (
                <TableCell key={index}>{element}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((element, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {element.id}
                    </TableCell>
                    {source === 'users' && (
                      <>
                        <TableCell>{`${element.first_name} ${element.last_name}`}</TableCell>
                        <TableCell>{element.user_status.name}</TableCell>
                      </>
                    )}
                    {source === 'barangays' && (
                      <TableCell>{element.name}</TableCell>
                    )}
                    {source === 'request-backups' && (
                      <TableCell>{element.emergency_id}</TableCell>
                    )}
                    {source === 'emergencies' && (
                      <>
                        <TableCell>
                          {element.user.first_name}{' '}
                          {element.user.middle_initial}.{' '}
                          {element.user.last_name}
                        </TableCell>
                        <TableCell>
                          {element.responder.first_name}{' '}
                          {element.responder.middle_initial}.{' '}
                          {element.responder.last_name}
                        </TableCell>
                        <TableCell>{element.emergency_type.name}</TableCell>
                      </>
                    )}
                    <TableCell>
                      {moment(element.date_added).format(
                        'MMMM DD, YYYY - h:mm:ss A'
                      )}
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleView(element.id)}>
                        View
                      </Button>
                      {source !== 'emergencies' && (
                        <>
                          <Button onClick={() => handleEdit(element.id)}>
                            Edit
                          </Button>
                          <Button onClick={() => handleRemove(element.id)}>
                            Delete
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                {head.map((element = '', index) => {
                  if (index === 0) {
                    return (
                      <TableCell key={index} sx={{ borderBottom: 'none' }}>
                        <Typography>No data found</Typography>
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={index} sx={{ borderBottom: 'none' }} />
                  );
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableData;
