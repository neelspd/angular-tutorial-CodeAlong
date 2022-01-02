
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() text:string = '';
  @Input() day:string = '';
  @Input() reminder:boolean = false;
  @Output() onAddTask:EventEmitter<Task> = new EventEmitter();
  showAddTask: boolean = false;
  subscription: Subscription;

  constructor(private uiService: UiService) 
  { 
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
    if(!this.text)
    {
      alert('Missing Text');
      return;
    }
    else if(!this.day)
    {
      alert('Missing Date and Time');
      return
    }
    else
    {
      console.log('Validation Complete, all good')
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }

    this.onAddTask.emit(newTask);

    this.text='';
    this.day='';
    this.reminder= false;

  }
}
