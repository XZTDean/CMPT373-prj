import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import {newReport, addEmptyQuestion, updateQuestion} from '../../API/reports';

enum RecordType {
    written,
    MCQ,
}

type Props = {
    id: number;
    type: RecordType;
};

type EntryState = {
    id: number;
    question: string;
    answer: string;
    type: RecordType;
};

type RecordState = {
    id: number;
    entryList: RecordEntry[];
};

class RecordEntry extends React.Component<Props, EntryState> {
    state: EntryState;

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id,
            question: "",
            answer: "",
            type: props.type,
        };
    }

    update() {
        updateQuestion(this.state.id, this.state.question, this.state.answer)
    }

    render() {
        return (
            <div>
                <ListItem alignItems="flex-start">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField fullWidth id="field" label="Field" variant="outlined"
                                       defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           this.setState({question: event.target.value});
                                           this.update();
                            }}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth id="value" label="Value" variant="outlined"
                                       defaultValue={this.state.answer} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                           this.setState({question: event.target.value});
                                           this.update();
                            }}/>
                        </Grid>
                    </Grid>
                </ListItem>
                <Divider component="li"/>
            </div>
        );
    }
}

class DataInput extends React.Component {
    state: RecordState = {
        entryList: [],
        id: 0
    }

    constructor(props: any) {
        super(props)
        newReport(props.department).then(r => this.setState({id: r.id}))
    }

    newEntry(id: number) {
        return <RecordEntry id={id} type={RecordType.written}/>
    }

    createNewEntry() {
        addEmptyQuestion(this.state.id).then(r => {
            let entry: any = this.newEntry(r.id)
            this.state.entryList.push(entry)
        })
    }

    render() {
        return (
            <div className="DataInput">
                <h1>Department Data Input</h1>
                <List>
                    {this.state.entryList.map(function(entry: RecordEntry, index: number) {
                        return {entry}
                    })}
                    <ListItem>
                        <Button variant="contained" size="large" startIcon={<AddIcon fontSize="large"/>} onClick={() => {
                            this.createNewEntry();
                        }}>Add</Button>
                    </ListItem>
                </List>
            </div>
        )
    }


}

export default DataInput;