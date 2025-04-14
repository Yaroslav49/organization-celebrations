import { Component, inject, Input, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { MinioService } from '../../../../services/minio.service';

@Component({
   selector: 'image-component',
   imports: [],
   templateUrl: './image-component.component.html',
   styleUrl: './image-component.component.css'
})
export class ImageComponentComponent implements OnInit {
   @Input() photo!: string;

   private readonly dialogs = inject(TuiDialogService);
   constructor(private minioService: MinioService) { }

   ngOnInit(): void {
      let image = this.photo;
      this.minioService.getImage(image).subscribe({
         next: (data: String) => {
            this.photo = String(data);
         }
      });
   }

   protected showDialog(url: string): void {
      this.dialogs
         .open(
            '<br><img src="' + url + '" class="big-photo" width="100%">',
            { size: 'l', data: { button: 'Закрыть' } },
         )
         .subscribe();
   }

   protected getPhotoUrl(image: string): string {
      return `data:image/jpg;base64,${image}`;
   }
}
