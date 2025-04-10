import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiRating } from '@taiga-ui/kit';
import { injectContext } from '@taiga-ui/polymorpheus';
import { FeedBackService } from '../../../services/feedback.service';

@Component({
   selector: 'app-rating',
   imports: [ReactiveFormsModule, TuiButton, TuiRating],
   providers: [TuiDialogService],
   templateUrl: './rating.component.html',
   styleUrl: './rating.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
   ratingForm: FormGroup = new FormGroup({
      evaluation: new FormControl('', Validators.required),
      description: new FormControl('')
   })

   readonly context = injectContext<TuiDialogContext<string,number>>();

   constructor(private feedBack: FeedBackService) {}

   protected onSubmit(): void {
      var evaluation: number = this.ratingForm.controls['evaluation'].value;
      var description: string = this.ratingForm.controls['description'].value;
      this.feedBack.rateMaster(this.context.data, evaluation, description).subscribe({
         next: (result: string) => {
            this.context.completeWith(result);
         }
      })
      console.log(this.ratingForm.value);
   }
}
