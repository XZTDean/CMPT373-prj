import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    newReport, getReportByDeptName,
    addEmptyQuestion, addQuestion, updateQuestion, deleteQuestion, answerQuestion,
    addMultipleChoiceQuestion, updateMultipleChoiceQuestion, updateMultipleChoiceQuestionChoice,
    deleteMultipleChoiceQuestion, answerMultipleChoiceQuestion, addWrittenQuestion,
    updateWrittenQuestion, deleteWrittenQuestion, answerWrittenQuestion, getReportByDeptID
} from '../../API/reports';
import {Question, Report, ReportData, ReportMetadata, responseToReport} from "./report";

const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

enum RecordType {
    written = "Written",
    MCQ = "Multiple Choice",
    numerical = "Numerical",
}

type Props = {
    id: number;
    type: RecordType;
    question: string;
    answer: string;
    options: Map<string, string>;
};

type EntryState = {
    id: number;
    question: string;
    answer: string;
    type: RecordType;
    entryField: any[];
    options: string[];
    isEdit: boolean;
};

type RecordState = {
    id: number;
    entryList: RecordEntry[];
    report: Report|null;
};

let reportId: number;
let report: DataInput;

class Metadata extends React.Component<{name: string, value: string|undefined, callback: any}, {isEdit: boolean, isShown: boolean}> {
    private changedValue: string;

    constructor(props: {name: string, value: string, callback: any}) {
        super(props);
        this.state = {
            isEdit: false,
            isShown: false
        }
        this.changedValue = props.value;
    }

    render() {
        if (this.state.isEdit) {
            if (this.props.value !== undefined) {
                this.changedValue = this.props.value;
            }
            return (<TextField fullWidth variant="standard" label={this.props.name} defaultValue={this.props.value}
                               InputProps={{
                                   endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton onClick={() => {
                                               this.setState({isEdit: false})
                                               if (this.props.callback != null) {
                                                   this.props.callback(this.changedValue);
                                               }
                                           }}>
                                               <CheckIcon />
                                           </IconButton>
                                       </InputAdornment>
                                   ),
                               }} onChange={event => {
                                   this.changedValue = event.target.value;
                               }
            }/>)
        } else {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignContent: 'center',
                        p: 1,
                        m: 1,
                    }}
                    onMouseEnter={() => {
                        this.setState({isShown: true});
                    }}
                    onMouseLeave={() => {
                        this.setState({isShown: false});
                    }}
                >
                    {this.props.name}: {this.props.value} <IconButton sx={{p: 0.5}} onClick={() => {
                        this.setState({isEdit: true})
                    }}> <EditIcon /> </IconButton>
                </Box>
            )
        }
    }
}

class MetadataArea extends React.Component<{month: string|undefined, user: string|undefined, changeMonth: any}, any> {

    render() {
        return (
            <Grid item xs={6}>
                <Box sx={{
                    bgcolor: "#EAEAEA",
                    borderRadius: 3,
                    p: 2,
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Metadata name={"Month"} value={this.props.month} callback={this.props.changeMonth}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Metadata name={"User"} value={this.props.user} callback={null}/>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        )
    }
}

class RecordEntry extends React.Component<Props, EntryState> {
    state: EntryState;

    constructor(props: Props) {
        super(props);
        this.state = {
            id: props.id,
            question: props.question,
            answer: props.answer,
            type: props.type,
            entryField: [],
            options: [],
            isEdit: false,
        };
        if (props.options.size > 0) {
            this.state.options = Array.from(props.options.values());
        }
        switch (props.type) {
            case RecordType.numerical:
                this.state.entryField = this.numericalQuestion();
                break;
            case RecordType.written:
                this.state.entryField = this.writtenQuestion();
                break;
            case RecordType.MCQ:
                this.state.entryField = this.mcq();
                break;
        }
    }

    update() {
        switch (this.state.type) {
            case RecordType.numerical:
                updateQuestion(this.state.id, this.state.question);
                break;
            case RecordType.written:
                updateWrittenQuestion(this.state.id, this.state.question);
                break;
            case RecordType.MCQ:
                updateMultipleChoiceQuestion(this.state.id, this.state.question);
                break;
        }
    }

    updateAnswer() {
        switch (this.state.type) {
            case RecordType.numerical:
                answerQuestion(this.state.id, this.state.answer);
                break;
            case RecordType.written:
                answerWrittenQuestion(this.state.id, this.state.answer);
                break;
            case RecordType.MCQ:
                answerMultipleChoiceQuestion(this.state.id, this.state.answer);
                break;
        }
    }

    delete() {
        switch (this.state.type) {
            case RecordType.numerical:
                deleteQuestion(this.state.id);
                break;
            case RecordType.written:
                deleteWrittenQuestion(this.state.id);
                break;
            case RecordType.MCQ:
                deleteMultipleChoiceQuestion(this.state.id);
                break;
        }
    }

    setQuestionAnswer(question: string, answer: string) {
        this.setState({question: question, answer: answer});
    }

    changeType(event: SelectChangeEvent) {
        if (this.state.type === event.target.value) {
            return
        }
        this.delete();
        switch (event.target.value) {
            case RecordType.MCQ:
                this.setState({type: RecordType.MCQ, answer: ""});
                addMultipleChoiceQuestion(reportId, this.state.question).then((r: any) => {
                    this.setState({id: r.id, entryField: this.mcq()});
                });
                break;
            case RecordType.written:
                this.setState({type: RecordType.written, answer: ""});
                addWrittenQuestion(reportId, this.state.question).then((r: any) => {
                    this.setState({id: r.id, entryField: this.writtenQuestion()});
                });
                break;
            case RecordType.numerical:
                this.setState({type: RecordType.written, answer: ""});
                addQuestion(reportId, this.state.question).then((r: any) => {
                    this.setState({id: r.id, entryField: this.numericalQuestion()});
                });
        }
    }

    numericalQuestion() {
        let entryList: any[] = [(
            <Grid item xs={8}>
                <TextField fullWidth id="field" label="Field" variant="outlined"
                           defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({question: event.target.value}, () => {
                        this.update();
                    });
                }}/>
            </Grid>
        )];
        entryList.push(
            <Grid item xs={2}>
                <TextField fullWidth id="value" label="Value" variant="outlined" type="number"
                           defaultValue={this.state.answer} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({answer: event.target.value}, () => {
                        this.updateAnswer();
                    });
                }}/>
            </Grid>
        )
        return entryList;
    }

    writtenQuestion() {
        let entryList: any[] = [(
            <Grid item xs={10}>
                <TextField fullWidth id="field" label="Field" variant="outlined"
                           defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({question: event.target.value}, () => {
                        this.update();
                    });
                }}/>
            </Grid>
        ), (
            <Grid item xs={12}>
                <TextField fullWidth id="value" label="Value" variant="outlined"
                           defaultValue={this.state.answer} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({answer: event.target.value}, () => {
                        this.updateAnswer();
                    });
                }}/>
            </Grid>
        )];
        return entryList;
    }

    mcq() {
        if (this.state.options.length === 0) {
            this.setState({isEdit: true});
        }
        let entryList: any[] = [(
            <Grid item xs={10}>
                <TextField fullWidth id="field" label="Field" variant="outlined"
                           defaultValue={this.state.question} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({question: event.target.value}, () => {
                        this.update();
                    });
                }}/>
            </Grid>
        )];
        if (this.state.isEdit) {
            this.state.options.forEach((value, index) => {
                entryList.push(
                    <Grid item xs={4}>
                        <TextField fullWidth id="choices" label={String.fromCharCode(65 + index)} variant="standard"
                                   InputProps={{endAdornment: (
                                       <InputAdornment position="end">
                                           <IconButton onClick={event => {
                                               this.setState({options: this.state.options.splice(index, 1)}, () => {
                                                   this.setState({entryField: this.mcq()});
                                                   updateMultipleChoiceQuestionChoice(this.state.id, this.getOptionMap());
                                               })
                                           }}>
                                               <DeleteForeverIcon />
                                           </IconButton>
                                       </InputAdornment>)}}
                                   defaultValue={value} onChange={event => {
                            this.setState({options: this.state.options.splice(index, 1, event.target.value)}, () => {
                                updateMultipleChoiceQuestionChoice(this.state.id, this.getOptionMap());
                            })
                        }}/>
                    </Grid>
                )
            });
            entryList.push(
                <Grid item xs={4}>
                    <IconButton onClick={event => {
                        this.setState({options: [...this.state.options, ""]}, () => {
                            this.setState({entryField: this.mcq()});
                            updateMultipleChoiceQuestionChoice(this.state.id, this.getOptionMap());
                        });
                    }}>
                        <AddIcon />
                    </IconButton>
                    <IconButton onClick={event => {
                        this.setState({isEdit: false}, () => {
                            this.setState({entryField: this.mcq()});
                        });
                    }}>
                        <CheckIcon />
                    </IconButton>
                </Grid>
            );
        } else {
            entryList.push(
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <RadioGroup row name="mcq-options" defaultValue={this.state.answer} onChange={event => {
                            this.setState({answer: event.target.value}, () => {
                                this.updateAnswer();
                            });
                        }}>
                            {this.state.options.map((value, index) => {
                                return (<FormControlLabel value={String.fromCharCode(65 + index)} control={<Radio />} label={value} />)
                            })}
                            <IconButton onClick={() => {
                                this.setState({isEdit: true}, () => {
                                    this.setState({entryField: this.mcq()});
                                });
                            }}>
                                <EditIcon />
                            </IconButton>
                        </RadioGroup>
                    </FormControl>
                </Grid>
            );
        }
        return entryList;
    }

    getOptionMap() {
        let optionMap = new Map<string, string>();
        this.state.options.forEach((value, index) => {
            optionMap.set(String.fromCharCode(65 + index), value);
        })
        return optionMap;
    }

    render() {
        return (
            <div>
                <ListItem alignItems="flex-start">
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <FormControl fullWidth>
                                <InputLabel id="question-type-select-label">Type</InputLabel>
                                <Select
                                    labelId="question-type-select-label"
                                    id="question-type"
                                    value={this.state.type}
                                    label="Type"
                                    onChange={(event) => {this.changeType(event)}}
                                >
                                    <MenuItem value={RecordType.numerical}>Numerical</MenuItem>
                                    <MenuItem value={RecordType.written}>Written</MenuItem>
                                    <MenuItem value={RecordType.MCQ}>Multiple Choice</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {this.state.entryField}
                    </Grid>
                </ListItem>
                <Divider component="li" variant='middle'/>
            </div>
        );
    }
}

class QuestionGroup extends React.Component<{groupName: string}, any> {
    questions: any[];

    constructor(props: {groupName: string}) {
        super(props);
        this.questions = []
    }

    createGroupQuestionList() {
        let questionList: any[] = [];
        report.state.report?.data.questions.forEach((value, index) => {
            if (value.group === this.props.groupName) {
                questionList.push((<RecordEntry question={value}/>)); // RecordEntry modify needed
            }
        })
        this.questions = questionList;
    }

    createNewEntry() {
        let question: Question = {
            id: -1,
            departmentId: report.props.location.state.id,
            question: "",
            answer: "",
            choices: "",
            group: this.props.groupName,
            order: this.questions.length,
            type: "numerical",
        }
        let changedReport = report.state.report;
        changedReport?.data.questions.push(question);
        report.setState({report: changedReport});
    }

    render() {
        this.createGroupQuestionList();
        return (
            <Box sx={{
                bgcolor: "#EBE4D5",
                borderRadius: 3,
                p: 2,
            }}>
                <List style={{marginLeft: "1em", marginRight: "1em"}}>
                    {this.questions}
                    <ListItem>
                        <Button variant="contained" size="large" startIcon={<AddIcon fontSize="large"/>} onClick={() => {
                            this.createNewEntry();
                        }}>Add</Button>
                    </ListItem>
                </List>
            </Box>
        );
    }

}

class DataInput extends React.Component<any, RecordState> {
    state: RecordState = {
        entryList: [],
        id: 0,
        report: null,
    };

    constructor(props: any) {
        super(props);
        const curr_month: string = monthNames[new Date().getMonth()]
        this.getData(curr_month);
        this.getData = this.getData.bind(this)
        report = this;
    }

    private getData(curr_month: string) {
        const departmentId = this.props.location.state.id;
        const name = this.props.location.state.department || null
        getReportByDeptID(departmentId).then((r: any[]) => {
            let report: any = null;
            r.forEach(data => {
                if (data.month === curr_month) {
                    report = data;
                }
            })
            if (report == null) {
                let reportName = name + " " + monthNames + " Report";
                let reportMeta: ReportMetadata = {
                    departmentId: departmentId,
                    departmentName: name,
                    month: curr_month,
                    name: reportName};
                newReport(reportMeta).then(r => {
                    this.setState({report: responseToReport(r)});
                })
            } else {
                this.setState({report: responseToReport(report)});
            }
        })
    }

    private compareQuestion(a: { id: number; }, b: { id: number; }) {
        return a.id - b.id;
    }

    newEntry(id: number) {
        return <RecordEntry id={id} type={RecordType.numerical} question={""} answer={""} options={new Map<string, string>()}/>
    }

    existEntry(id: number, type: RecordType, question: string, answer: string, options: Map<string, string> = new Map<string, string>()) {
        return <RecordEntry id={id} type={type} question={question} answer={answer} options={options}/>
    }

    createNewEntry() {
        addEmptyQuestion(this.state.id).then((r: any) => {
            let entry: any = this.newEntry(r.id);
            this.setState({entryList: [...this.state.entryList, entry]});
        })
    }

    render() {
      const name = this.props.location.state.department || null
        return (
            <div className="DataInput">
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <h1 style={{marginLeft: "1em", marginRight: "1em"}}>{ name } Department Data Input</h1>
                    </Grid>
                    <MetadataArea month={this.state.report?.metadata.month} user={this.state.report?.metadata.editedBy} changeMonth={this.getData}/>
                </Grid>
                <List style={{marginLeft: "1em", marginRight: "1em"}}>
                    {this.state.entryList}
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
